import { Injectable, NotFoundException } from '@nestjs/common';
import { parse, stringify } from 'csv-string';

@Injectable()
export class FileService {
  async deleteYahooEmailsFromCsv(file: any): Promise<string> {
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const csvString = file.buffer.toString();
    const rows = parse(csvString);

    const emailColumn = 10;

    const filteredRows = rows.filter(
      row => !row[emailColumn].includes('@yahoo'),
    );

    const newCsv = stringify(filteredRows);
    const newCsvBuffer = Buffer.from(newCsv, 'utf8');

    return JSON.stringify(newCsvBuffer);
  }
}
