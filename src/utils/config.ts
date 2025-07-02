export const config = {
    port: Number(process.env.PORT) || 4000,
    normalizerUrl:
        process.env.NORMALIZER_URL ?? "http://localhost:5000/records",
};
