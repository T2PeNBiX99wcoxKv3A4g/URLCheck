import {
    type DataBlock as SharedDataBlock,
    DataClient,
    decodeDataBlock,
} from "@photino-net-utils/bridge";

/** The host's local data plane: binary list blocks and raw files. */
export const data = new DataClient({baseMessage: "data.base"});

export type DataBlock = SharedDataBlock;

export const decodeBlock = decodeDataBlock;
