import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestForProposalService } from './request-for-proposal.service';
import { CreateRequestForProposalDto } from './dto/create-request-for-proposal.dto';
import { UpdateRequestForProposalDto } from './dto/update-request-for-proposal.dto';

@Controller('request-for-proposal')
export class RequestForProposalController {
  constructor(
    private readonly requestForProposalService: RequestForProposalService,
  ) {}

  @Post()
  create(@Body() createRequestForProposalDto: CreateRequestForProposalDto) {
    return this.requestForProposalService.create(createRequestForProposalDto);
  }

  @Get()
  findAll() {
    return this.requestForProposalService.findAll();
  }
  @Get('corporation/:corpID')
  findAllForCorporation(
    @Param('corpID') corpID: string,
    @Query() query: { page: string; limit: string },
  ) {
    return this.requestForProposalService.findAllForCorporation(
      corpID,
      Number(query.page),
      Number(query.limit),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestForProposalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestForProposalDto: UpdateRequestForProposalDto,
    @Query() query: { page: string; limit: string },
  ) {
    return this.requestForProposalService.update(
      id,
      updateRequestForProposalDto,
      Number(query.page),
      Number(query.limit),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestForProposalService.remove(id);
  }
}
