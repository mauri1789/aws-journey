export interface ExecutionTest {
   test: string
   description: string
   success: boolean
}
export interface ExecutionStep {
   step: string
   success: boolean | null
   execution_id: string
   tests: ExecutionTest[]
   description: string
   error?: string
}
export interface UserInput {
   key: string
   value: string
}
export interface Execution {
   user_input: UserInput[]
   status: string
   steps: ExecutionStep[]
}

 