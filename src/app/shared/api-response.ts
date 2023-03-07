export class ApiResponse {
  constructor(
    public status: string,
    public response_code: number,
    public payload: any
  ) {}
}
