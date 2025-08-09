import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  async create(@Body() createProposalDto: CreateProposalDto) {
    console.log(createProposalDto);
    return await this.proposalService.create(createProposalDto);
  }

  @Get()
  async findAll() {
    return await this.proposalService.findAll();
  }

  @Get('corporation/:corpID')
  async findAllProposalForCorporation(@Param('corpID') corpID: string) {
    return await this.proposalService.findAllProposalForCoporation(corpID);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.proposalService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return await this.proposalService.update(id, updateProposalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.proposalService.remove(id);
  }
}
