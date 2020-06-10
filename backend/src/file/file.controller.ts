import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  getProducts(@UploadedFile() file): Promise<string> {
    return this.fileService.deleteYahooEmailsFromCsv(file);
  }
}
