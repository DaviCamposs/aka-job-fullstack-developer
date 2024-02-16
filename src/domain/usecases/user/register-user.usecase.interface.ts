export interface IRegisterUserUseCase {
  execute(name: string, email: string, password: string): Promise<void>;
}
