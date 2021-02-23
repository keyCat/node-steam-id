import bigInt, {BigInteger} from 'big-integer';

export default function getBinaryPart(i64: BigInteger, offset: number, mask: number): BigInteger {
    return bigInt(i64)
        .shiftRight(offset)
        .and(mask);
}
