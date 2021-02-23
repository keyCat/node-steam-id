import bigInt, {BigInteger} from 'big-integer';

export function setBinaryPart(i64: BigInteger, offset: number, mask: number, value: number): BigInteger {
    const res = bigInt(mask)
        .shiftLeft(offset)
        .add(1).negate() // complement
        .and(i64)
        .or(
            bigInt(value)
                .and(mask)
                .shiftLeft(offset)
        );

    return res;
}
