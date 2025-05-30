import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAllForCorporation(@Param('corpID') corpID: string) {
    return this.requestForProposalService.findAllForCorporation(corpID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestForProposalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestForProposalDto: UpdateRequestForProposalDto,
  ) {
    return this.requestForProposalService.update(
      id,
      updateRequestForProposalDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestForProposalService.remove(id);
  }
}
