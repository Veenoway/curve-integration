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
