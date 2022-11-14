import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import { IncomingForm, File } from 'formidable';
import * as fileService from '@services/file-service';

const paths = {
  basePath: '/files',
  upload: '/upload',
} as const;

/**
 * Upload file.
 */
function upload(req: IReq, res: IRes) {
  const form = new IncomingForm();
  form.parse(req, (err, _fields, files) => {
    if (err) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    if (!files?.filetoupload) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send();
    }

    const filetoupload = files.filetoupload as File;

    const newFilePath = fileService.saveFile(filetoupload.filepath, filetoupload.originalFilename as string);
    return res.status(HttpStatusCodes.OK).json(newFilePath);
  });
}

export default {
  paths,
  upload,
} as const;
