import { createContext, ReactNode, useEffect, useState } from "react";
import React from 'react';
import axios from "axios";

type User = {
    id: string;
    name: string | null;
    avatar: string | null;
}

type AuthContextProviderProps = {
    children: ReactNode
}