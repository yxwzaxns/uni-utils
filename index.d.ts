declare type TaskOptions = {
    execLength?: number
    timeGap?: number
    [key: string]: any
}

declare type ReadCsvOptions = {
    headers: boolean
}

declare type ExportFileFormat = 'csv' | 'json'

declare type HashType = 'md5' | 'sha1' | 'sha256' | 'sha512'

declare type DownloadOptions = {
    savePath?: string
    decoding?: string
    proxy?: any
    [key: string]: any
}

declare type ListDownloadOptions = TaskOptions & {
    skipExist?: boolean
}

declare namespace Utils {
    const version: string

    // core
    function removeDuplicate(arr: any[], key: string): any[]

    function arrayRemove(arr: any[], ...item: any[]): any[]

    function range(start: number, end: number): number[]

    function loopTask(tasks: any[], taskResolve: (data: any) => Promise<any>, options?: TaskOptions): Promise<any>

    function randomStr(len: number, type?: 1 | 2 | 3): string

    function randomNum(len: number): number

    function uuid(ver: string, ...args: any[]): string

    function nanoid(len:number):string

    function urlNanoid(len:number):string

    // dir
    function createDir(dirPath: string | string[]): Promise<void>

    function readDir(dirPath: string): Promise<string[]>

    function copyDir(srcDir: string, distDir: string): Promise<void>

    // file
    function checkFile(file: string): Promise<boolean>

    function fileExist(file: string): Promise<boolean>

    function checkFileSync(file: string): boolean

    function readFile(file: string): Promise<string>

    function readFileSync(file: string): string

    function saveFile(data: string, path: string): Promise<void>

    function saveFileSync(data: string, path: string): void

    function getLastLine(file: string): Promise<string>

    function readJson(file: string): Promise<any>

    function readJsonSync(file: string): any

    function readCsv(file: string, options?: ReadCsvOptions): Promise<string[]>

    function rm(file: string): Promise<void>

    function exportFile(data: string, path: string, format?: ExportFileFormat): Promise<void>

    function copyFile(srcFile: string, distFile: string): Promise<void>

    function moveFile(srcFile: string, distFile: string): Promise<void>

    function saveJson(jsonObj: object, filepath: string): Promise<void>

    // hash
    namespace hash {
        function getStringHash(string: string, hashType: HashType): string

        function getFileHash(filePath: string, hashType: HashType): Promise<string>

        function getFileMd5(filePath: string): ReturnType<typeof getFileHash>

        function getFileSha256(filePath: string): ReturnType<typeof getFileHash>

        function sha1(string: string): ReturnType<typeof getStringHash>

        function sha256(string: string): ReturnType<typeof getStringHash>

        function sha512(string: string): ReturnType<typeof getStringHash>

        function md5(string: string): ReturnType<typeof getStringHash>
    }
    // network
    function download(url: string, options: DownloadOptions): Promise<any>

    function listDownload(url: string, options: ListDownloadOptions): Promise<any>

    // path
    function homedir(): string

    // process
    function restartProcess(): void

    function createProcess(scriptPath: string, options: string[]): Promise<any>

    // text
    function parseHtml(htmlText: string): any

    function atob(string: string): string

    function btoa(string: string): string

    function atoh(string: string): string

    function htoa(string: string): string

    // time
    function sleep(microSeconds: number): Promise<void>

    function getTime(time: any, format?: string): string

    function getTimeStamp(): number

    function getTodayDate(): string

    function countdown(seconds: number, revoke: () => void): Promise<void>

}

export = Utils
