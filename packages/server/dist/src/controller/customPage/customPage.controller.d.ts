import { Response, Request } from 'express';
import { CustomPageProvider } from 'src/provider/customPage/customPage.provider';
export declare class PublicCustomPageController {
    private readonly customPageProvider;
    constructor(customPageProvider: CustomPageProvider);
    getPageContent(pathname: string, res: Response, req: Request): Promise<void>;
}
export declare class PublicOldCustomPageRedirectController {
    redirect(res: Response, req: Request): Promise<void>;
}
