import { AsyncReturnType } from './../../../@types/index.d';
import { accountService } from './auth.service';
export type accountServiceDTO = AsyncReturnType<typeof accountService>;
