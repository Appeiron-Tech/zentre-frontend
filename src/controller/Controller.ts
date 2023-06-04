import { reactive } from 'vue'

import type { IConfig } from '@/controller/IController'

export class Controller {
  private m_config: IConfig
  private m_loadingConfig = true

  constructor() {
    this.m_config = {}
  }

  get loadingConfig(): boolean {
    return this.m_loadingConfig
  }
  set loadingConfig(p_loadingConfig: boolean) {
    this.m_loadingConfig = p_loadingConfig
  }

  /**
   * Methods
   */
  public getConfig(): IConfig {
    return this.m_config
  }

  // Method used for async functions
  public init() {
    // Do async calls and then set loading as false
    this.m_loadingConfig = false
  }
}

const appController = reactive(new Controller())
appController.init()
export default appController
