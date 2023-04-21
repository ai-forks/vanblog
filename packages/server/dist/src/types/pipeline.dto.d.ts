export declare class CreatePipelineDto {
    name: string;
    description?: string;
    enabled: boolean;
    eventName: string;
    script: string;
    deps?: string[];
}
export declare class UpdatePipelineDto {
    name?: string;
    description?: string;
    enabled?: boolean;
    eventName?: string;
    script?: string;
    deps?: string[];
}
