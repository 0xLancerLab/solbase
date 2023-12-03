/* eslint-disable react/no-unused-prop-types */

import React from "react";
import styled from "styled-components";
import ApyButton from "./ApyButton";
import { BASE_ADD_LIQUIDITY_URL } from "config";
import getLiquidityUrlPathParts from "utils/getLiquidityUrlPathParts";
import { Skeleton } from "uikit";

const Container = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 20px;
    svg {
      path {
        fill: #0d0d0d;
      }
    }
  }
`;

const initialAPR = (key) => {
  if (key === 0) {
    return (
      <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
        {(45854 / 365).toFixed(2)}%
      </div>
    );
  } else if (key === 1) {
    return (
      <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
        {(11139 / 365).toFixed(2)}%
      </div>
    );
  } else if (key === 2) {
    return (
      <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
        {(5570 / 365).toFixed(2)}%
      </div>
    );
  } else {
    return (
      <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
        {(3939 / 365).toFixed(2)}%
      </div>
    );
  }
};

const Apr = ({
  value,
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  wildPrice,
  originalValue,
  hideButton = false,
  index,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress,
    tokenAddress,
  });
  // const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`;
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}`;

  return originalValue !== 0 ? (
    <Container>
      <>
        <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
          {value}%
        </div>
        {!hideButton && (
          <ApyButton
            lpLabel={lpLabel}
            wildPrice={wildPrice}
            apr={originalValue}
            addLiquidityUrl={addLiquidityUrl}
          />
        )}
      </>
    </Container>
  ) : (
    <Container>
      <div className="min-w-[60px] text-left text-symbol text-[11px] md:text-sm font-semibold">
        {originalValue}%
      </div>
    </Container>
  );
};

export default Apr;
