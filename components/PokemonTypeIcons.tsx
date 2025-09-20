import {
    Flame, Droplets, Leaf, Zap, Snowflake, Swords,
    Skull, Mountain, Wind, Brain, Bug, Diamond,
    Ghost, Activity, Moon, Shield, Sparkles, Circle
} from "lucide-react";
import React from "react";

export const typeIcons: Record<string, React.ReactNode> = {
    Normal: <Circle className="w-5 h-5 text-gray-500" />,
    Fire: <Flame className="w-5 h-5 text-orange-500" />,
    Water: <Droplets className="w-5 h-5 text-blue-500" />,
    Grass: <Leaf className="w-5 h-5 text-green-500" />,
    Electric: <Zap className="w-5 h-5 text-yellow-500" />,
    Ice: <Snowflake className="w-5 h-5 text-cyan-400" />,
    Fighting: <Swords className="w-5 h-5 text-red-600" />,
    Poison: <Skull className="w-5 h-5 text-purple-500" />,
    Ground: <Mountain className="w-5 h-5 text-amber-700" />,
    Flying: <Wind className="w-5 h-5 text-indigo-400" />,
    Psychic: <Brain className="w-5 h-5 text-pink-500" />,
    Bug: <Bug className="w-5 h-5 text-lime-600" />,
    Rock: <Diamond className="w-5 h-5 text-stone-500" />,
    Ghost: <Ghost className="w-5 h-5 text-violet-700" />,
    Dragon: <Activity className="w-5 h-5 text-indigo-600" />,
    Dark: <Moon className="w-5 h-5 text-gray-800" />,
    Steel: <Shield className="w-5 h-5 text-slate-400" />,
    Fairy: <Sparkles className="w-5 h-5 text-pink-400" />,
};