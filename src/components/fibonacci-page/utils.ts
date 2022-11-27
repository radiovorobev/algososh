export const fibAlgorithm = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 2) {
        return 1;
    }
    memo[n] = fibAlgorithm(n - 1, memo) + fibAlgorithm(n - 2, memo);
    return memo[n];
}