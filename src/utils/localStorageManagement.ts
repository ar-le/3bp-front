export class LocalStorageManager{

    static put<T>(key: string, data : T) : void{
        localStorage.setItem(key, JSON.stringify(data));
    }

    static get<T>(key: string ) : T | null{
        try {
            const jsonValue = localStorage.getItem(key);
            const value = jsonValue != null ? JSON.parse(jsonValue) : null;
            return value;
          } catch (e) {
            return null;
          }
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    static clear(): void {
        localStorage.clear();
    }
}