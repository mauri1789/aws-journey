export interface Step {
   step: string;
   text: string;
   comments?: string;
   code?: string;
   code_url?: string;
   list?: string[];
}

export interface Section {
   section_id?: string
   title?: string
   description: string
   steps?: Step[]
}
