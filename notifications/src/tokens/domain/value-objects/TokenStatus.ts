export class TokenStatus {
  private readonly value: "PENDING" | "USED" | "EXPIRED";

  private constructor(value: "PENDING" | "USED" | "EXPIRED") {
    this.value = value;
  }

  static PENDING = new TokenStatus("PENDING");
  static USED = new TokenStatus("USED");
  static EXPIRED = new TokenStatus("EXPIRED");

  static from(value: string): TokenStatus {
    switch (value) {
      case "PENDING":
        return TokenStatus.PENDING;
      case "USED":
        return TokenStatus.USED;
      case "EXPIRED":
        return TokenStatus.EXPIRED;
      default:
        throw new Error(`Estado de token inválido: ${value}`);
    }
  }
  isPending(): boolean {
    return this.value === "PENDING";
  }

  getValue(): "PENDING" | "USED" | "EXPIRED" {
    return this.value;
  }
}
