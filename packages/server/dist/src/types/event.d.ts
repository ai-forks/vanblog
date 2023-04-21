export interface VanblogEventItem {
    eventName: string;
    eventNameChinese: string;
    eventDescription: string;
    passive: boolean;
}
export type VanblogEventType = "system" | "custom" | "corn";
export declare const VanblogSystemEvents: VanblogEventItem[];
export declare const VanblogSystemEventNames: string[];
export type VanblogSystemEvent = 'login' | 'logout' | 'beforeUpdateArticle' | 'afterUpdateArticle' | 'deleteArticle' | 'beforeUpdateDraft' | 'afterUpdateDraft' | 'deleteDraft' | 'updateSiteInfo' | 'manualTriggerEvent';
