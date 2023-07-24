import type { ICentred } from '@/models/centred/Centred.interface'

export interface ICentredService {
  getCentred(centredId: string): Promise<ICentred>
  updateCentred(request: ICentred): Promise<ICentred>
}
