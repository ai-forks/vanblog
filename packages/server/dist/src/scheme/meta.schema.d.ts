/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
import { AboutDto } from 'src/types/about.dto';
import { LinkItem } from 'src/types/link.dto';
import { MenuItem } from 'src/types/menu.dto';
import { RewardItem } from 'src/types/reward.dto';
import { SiteInfo } from 'src/types/site.dto';
import { SocialItem } from 'src/types/social.dto';
export type MetaDocument = Meta & Document;
export declare class Meta extends Document {
    links: LinkItem[];
    socials: SocialItem[];
    menus: MenuItem[];
    rewards: RewardItem[];
    about: AboutDto;
    siteInfo: SiteInfo;
    viewer: number;
    visited: number;
    categories: string[];
    totalWordCount: number;
}
export declare const MetaSchema: import("mongoose").Schema<Meta, import("mongoose").Model<Meta, any, any, any, Document<unknown, any, Meta> & Omit<Meta & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meta, Document<unknown, {}, import("mongoose").FlatRecord<Meta>> & Omit<import("mongoose").FlatRecord<Meta> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
