import React from "react";
import { useParams } from 'react-router-dom';

import { PlayerInfo } from "../components/PlayerInfo";

export default function Player() {
  const { playerId } = useParams();

  return <PlayerInfo id={playerId} />;
};
