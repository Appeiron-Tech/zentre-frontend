import type { ICentred, ICentredUpdate } from '@/models/centred/Centred.interface'

export interface ICentredService {
  getCentred(centredId: string): Promise<ICentred>
  updateCentred(centredId: string, centredToUpdate: ICentredUpdate): Promise<ICentred>
}
