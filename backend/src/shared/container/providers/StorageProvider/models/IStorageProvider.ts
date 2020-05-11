export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(fle: string): Promise<void>;
}
