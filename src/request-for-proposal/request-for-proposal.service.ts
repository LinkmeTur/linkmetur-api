import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequestForProposalDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestForProposal } from './entities/request-for-proposal.entity';
import { RequestPhotos } from './entities/request-photos.entity';

@Injectable()
export class RequestForProposalService {
  constructor(
    @InjectRepository(RequestForProposal)
    private readonly requestForProposalRepository: Repository<RequestForProposal>,
    @InjectRepository(RequestPhotos)
    private readonly requestPhotosRepository: Repository<RequestPhotos>,
  ) {}
  async create(createRequestForProposalDto: CreateRequestForProposalDto) {
    const newRequest = this.requestForProposalRepository.create(
      createRequestForProposalDto,
    );
    return await this.requestForProposalRepository.save(newRequest);
  }

  async findAll() {
    return await this.requestForProposalRepository.find({
      relations: {
        proposals: {
          fotos: true,
        },
        fotos: true,
      },
    });
  }

  async findForPrestador(
    prestadorID: string,
    page: number,
    limit: number,
    all: boolean,
  ): Promise<{
    rfps: RequestForProposal[];
    totalRecords: number;
    totalPages: number;
  }> {
    if (all) {
      // Busca todas as RFPs (sem paginação inicial)
      const response = await this.requestForProposalRepository.find({
        relations: {
          proposals: {
            fotos: true,
          },
          fotos: true,
        },
      });
      console.log('rfps', response);
      if (!response.length) {
        throw new HttpException('RFPs not found', HttpStatus.NOT_FOUND);
      }

      // Filtro: RFPs sem prestador ou com prestador igual ao informado
      const filtered = response.filter((rfp) => {
        console.log(rfp.prestadorID, prestadorID);
        console.log(rfp.prestadorID === null, rfp.prestadorID === prestadorID);
        return rfp.prestadorID === null || rfp.prestadorID === prestadorID;
      });

      const totalRecords = filtered.length;
      const totalPages = Math.ceil(totalRecords / limit);
      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);

      return {
        rfps: paginated,
        totalRecords,
        totalPages,
      };
    }
    const skip = (page - 1) * limit;
    const [rfps, totalRecords] =
      await this.requestForProposalRepository.findAndCount({
        where: { prestadorID },
        skip,
        take: limit,
        relations: {
          proposals: {
            fotos: true,
          },
          fotos: true,
        },
      });
    if (!rfps) {
      throw new HttpException('RFPs not found', HttpStatus.NOT_FOUND);
    }
    const totalPages = Math.ceil(totalRecords / limit);
    return { rfps, totalRecords, totalPages };
  }

  async findAllForCorporation(
    corpID: string,
    page: number,
    limit: number,
  ): Promise<{
    rfps: RequestForProposal[];
    totalRecords: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [rfps, totalRecords] =
      await this.requestForProposalRepository.findAndCount({
        where: { corpID },
        skip,
        take: limit,
        relations: {
          proposals: {
            fotos: true,
          },
          fotos: true,
        },
      });
    if (!rfps) {
      throw new HttpException('RFPs not found', HttpStatus.NOT_FOUND);
    }
    const totalPages = Math.ceil(totalRecords / limit);
    return { rfps, totalRecords, totalPages };
  }

  async findOne(id: string) {
    return await this.requestForProposalRepository.findOne({
      where: { id },
      relations: {
        proposals: {
          fotos: true,
        },
        fotos: true,
      },
    });
  }

  async update(
    id: string,
    updateRequestForProposalDto: UpdateRequestForProposalDto,
    page: number,
    limit: number,
  ) {
    const { fotos, ...dadosSemFotos } = updateRequestForProposalDto;
    console.log('dados', dadosSemFotos);
    console.log('fotos', fotos);
    await this.requestForProposalRepository.update(id, dadosSemFotos);
    const fotosExistentes = await this.requestPhotosRepository.find({
      where: { request_ID: id },
    });
    if (fotos && Array.isArray(fotos)) {
      for (const foto of fotos) {
        const fotoExistente = fotosExistentes
          ? fotosExistentes.find((f) => f.photo_URL === foto.photo_URL)
          : undefined;
        if (!fotoExistente) {
          const novaFoto = this.requestPhotosRepository.create({
            photo_URL: foto.photo_URL,
            photo_alt: foto.photo_alt,
            request: { id },
          });
          await this.requestPhotosRepository.save(novaFoto);
        } else {
          await this.requestPhotosRepository.update(fotoExistente.id, foto);
        }
      }
    }

    return await this.findAllForCorporation(
      dadosSemFotos.corpID as string,
      page,
      limit,
    );
  }

  async remove(id: string): Promise<void> {
    await this.requestForProposalRepository.delete(id);
  }
}
