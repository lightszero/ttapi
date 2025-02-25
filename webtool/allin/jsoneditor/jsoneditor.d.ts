declare class JSONEditor {
    constructor(container:HTMLDivElement,option:JsonEditorOption,json:object);

    update(json:object);
    updateText(json:string);
    validate();

    getText():string;
    get():object;
} 
declare ViewMode:'code'| 'form'| 'text'|'tree'| 'view'| 'preview';
declare interface JsonEditorOption
{
    mode:ViewMode;
    modes?:ViewMode[];
    onModeChange?:((newMode:string, oldMode:string)=>void);
    onChange?:(()=>void);
}