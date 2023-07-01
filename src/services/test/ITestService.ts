// Interface required as param of the api
export interface IResTest {
  responseBody: {
    message: string
  }
}

export interface ITestService {
  getTestService(): Promise<IResTest>
}
