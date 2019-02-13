export interface Transport {
    /**
     * Appends anything to y.
     */
    append(x: string): void;

    /**
     * The transport name for the collection
     */
    name: string;
}