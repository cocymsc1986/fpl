import React from "react";
import { useParams } from 'react-router-dom';

import { TeamInfo } from "../components/TeamInfo";

export default function Team() {
  const { teamId } = useParams();

  return <TeamInfo id={teamId} />
};
