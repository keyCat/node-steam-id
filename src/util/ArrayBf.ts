export class ArrayBf {
    private arr: number[];

    constructor(
        public readonly length: number,
    ) {
        this.arr = Array(this.length);
        this.zerofill();
    }

    public toArray(): number[] {
        const cp = Array(this.length);
        let i = this.length;
        while (i--) { cp[this.length - i - 1] = this.arr[i]; }
        return cp;
    }

    public writeNum(value: number, offset: number, bits?: number): void {
        const bin = value.toString(2);
        bits = bits || bin.length;
        let i = offset + bits;
        while (i-- > offset) {
            // console.log(i - offset);
            this.arr[i] = +bin.charAt(i - offset) || 0;
        }
    }

    public readNum(offset: number, bits: number): number {
        let bin = '';
        let i = offset + bits;
        while (i-- > offset) {
            bin += this.arr[i];
        }
        return parseInt(bin, 2);
    }

    public zerofill(): void {
        let i = this.length;
        while (i--) { this.arr[i] = 0 }
    }
}
