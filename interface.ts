export interface SwapEventProps {
  buyer: string;
  sold_id: number;
  tokens_sold: number;
  bought_id: number;
  tokens_bought: number;
}

export interface RemoveLiquidityOneEventProps {
  provider: string;
  token_amount: number;
  coin_amount: number;
}

export interface RemoveLiquidityEventProps {
  provider: string;
  token_amounts: number[];
  fees: number[];
  token_supply: number;
}

export interface PoolsEventProps {
  coin: string;
  base_pool: string;
  A: number;
  fee: number;
  deployer: string;
}
export interface PlainPoolEventProps
  extends Omit<PoolsEventProps, "base_pool"> {}

export interface LiquidityDepositEventProps {
  provider: string;
  token_amounts: number[];
  fees: number[];
  invariant: number;
  token_supply: number;
}
