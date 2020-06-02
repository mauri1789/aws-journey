export interface Step {
   step: string
   text: string
   comments?: string
   code?: string
   code_url?: string
   code_extension?: string
   code_file_name?: string
   list?: string[]
   images?: string[]
}

export interface Section {
   section_id?: string
   title?: string
   description: string
   steps?: Step[]
}
