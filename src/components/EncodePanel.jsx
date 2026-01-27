import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { encryptMessage } from '../utils/crypto';
import { textToBinary, injectInvisible } from '../utils/steganography';

const emotions = {
    thinking: {
        left_hand: ["╰", "\\", "/", "~", "-", "--", "∪", "乁", "∠", "「"],
        eyePairs: [
            ["ರ", "ರ"], ["°", "°"], ["`", "`"], ["⊙", "⊙"], ["□", "□"], ["•", "•"]
        ],
        mouths: ["｡", "_", "~"],
        right_hand: ["/", "~", "-", "ゞ", "┘", "╯", "ﾉ"]
    },
    joy: {
        left_hand: ["<", "v", "╰", "\\", "/", "⸜", "~", "-", "--", "┐", "⊂", "ヽ", "∪", "૮", "乁", "∠", "٩", "╭"],
        eyePairs: [
            ["^", "^"], ["◕", "◕"], ["≧", "≦"], ["⌒", "⌒"],
            ["•", "•"], ["ʘ", "ʘ"], ["„•", "•„"], ["ᗒ", "ᗕ"], ["❛", "❛"], ["o^", "o^"],
            ["＾", "＾"], ["*^", "^*"], ["✯", "✯"], ["✧", "✧"], ["*⌒", "⌒*"], ["｡•", "•｡"], ["〃＾", "＾〃"],
            [">", "<"], ["๑˘", "˘๑"]
        ],
        mouths: ["‿", "︶", "◡", "v", "ㅅ", "ω"],
        right_hand: [">", "v", "->", "/", "~", "-", "-->", "┘", "⊃", "ノ", "∩", "૯", "╯", "ﾉ", "ﻭ", "۶"]
    },
    love: {
        left_hand: ["〜", "/", "\\", "ノ", "ヽ", "♡-", "♡~", "乁", "╰", "⌒", "❤~", "❤-"],
        eyePairs: [
            ["♡", "♡"], ["❤", "❤"], ["•", "•"], ["◕", "◕"], ["˘", "˘"],
            ["´", "´"], ["„•", "•„"], ["ᗒ", "ᗕ"], ["❛", "❛"], [" ◡", " ◡"], ["♡°", "°♡"], ["｡• ", "•｡ "]
        ],
        mouths: ["3", "ω", "ε", "ᴗ", "‿", "ᴥ"],
        right_hand: ["〜", "/", "\\", "ノ", "ヽ", "", "っ", "づ", "♡", "-❤", "~❤"]
    },
    embarrassment: {
        left_hand: ["/", "\\", "ノ", "ヽ", "つ"],
        eyePairs: [
            ["・", "・"], ["｡", "｡"], ["´", "´"], ["￣", "￣"],
            ["⌒", "⌒"], ["o", "o"], ["μ", "μ"]
        ],
        mouths: ["﹏", "｡", "_", "."],
        right_hand: ["/", "\\", "ノ", "ヽ", "っ", "づ", "〜"]
    },
    sympathy: {
        left_hand: ["/", "\\", "ノ", "ヽ", "つ", "っ", "╯", "づ"],
        eyePairs: [
            [";", ";"], ["T", "T"], ["´", "´"], ["ω", "ω"], ["｡", "｡"]
        ],
        mouths: ["_", "︶", "︵", "｡", "﹏", "︿"],
        right_hand: ["/", "\\", "ノ", "ヽ", "ﾉ", "っ", "づ", "っ"]
    },
    dissatisfaction: {
        left_hand: ["", "⌒", "╭", "ヽ", "┐", "┌"],
        eyePairs: [
            [">", ">"], ["<", "<"], ["¬", "¬"], ["￣", "￣"], ["-", "-"]
        ],
        mouths: ["︵", "_", "︶", "︿", "へ", "︺", "o", "="],
        right_hand: ["", "／", "\\", "ﾉ", "╮", "╯"]
    },
    anger: {
        left_hand: ["", "┐", "╭", "凸", "ﾉ", "٩", "乁"],
        eyePairs: [
            ["`", "´"], ["´", "´"], ["▼", "▼ ╬"], ["╬", "╬"], ["#Φ", "Φ#"]
        ],
        mouths: ["皿", "益", "︵", "︿", "︷"],
        right_hand: ["", "ﾉ", "╯", "凸", "ψ", "/", "\\", "ง"]
    },
    sadness: {
        left_hand: ["", "/", "\\", "ノ", "ヽ", "つ", "っ"],
        eyePairs: [
            ["T", "T"], [";", ";"], ["╯", "╰"], ["｡", "｡"], ["╥", "╥"], ["〒", "〒"]
        ],
        mouths: ["︵", "_", "｡", "﹏", "o", "n"],
        right_hand: ["", "/", "\\", "ノ", "ヽ", "っ", "づ", "っ"]
    },
    pain: {
        left_hand: ["", "/", "\\", "~", "つ", "ﾉ"],
        eyePairs: [
            ["x", "x"], ["×", "×"], ["X", "X"], ["✖", "✖"], ["T", "T"], [">", "<"], ["+", "+"]
        ],
        mouths: ["o", "O", "︶", "︵", "﹏", "+"],
        right_hand: ["", "/", "\\", "ﾉ", "╯"]
    },
    fear: {
        left_hand: ["", "/", "\\", "ノ", "ヽ"],
        eyePairs: [
            ["o", "o"], ["O", "O"], ["0", "0"], ["●", "●"], ["°", "°"], [".", "."]
        ],
        mouths: ["o", "O", "︶", "︵", "_", "｡"],
        right_hand: ["", "/", "\\", "ノ", "ヽ", "っ", "づ"]
    },
    neutral: {
        left_hand: ["", "¯\\_", "\\", "/", "("],
        eyePairs: [
            ["-", "-"], ["―", "―"], ["ˍ", "ˍ"], ["ˉ", "ˉ"], ["·", "·"], ["｡", "｡"]
        ],
        mouths: ["_", "︶", "‿", "﹏", "･"],
        right_hand: ["", "_/¯", "/", "\\", "ﾉ"]
    },
    confusion: {
        left_hand: ["", "/", "\\", "ヽ", "っ"],
        eyePairs: [
            ["·", "·"], ["･", "･"], [".", "."], ["@", "@"], ["◎", "◎"], ["?", "?"], [".", ". ?"], ["_", "_"]
        ],
        mouths: ["?", "_", "｡", "・", "﹏"],
        right_hand: ["", "/", "\\", "ノ", "ヽ"]
    },
    doubt: {
        left_hand: ["", "/", "\\", "ノ", "ヽ", "っ"],
        eyePairs: [
            ["¿", "¿"], ["?", "?"], ["・", "・"], ["", ""], ["´", "´"], ["←", "←"]
        ],
        mouths: [".", "_", "﹏", "?", "o"],
        right_hand: ["", "/", "\\", "〜"]
    },
    surprise: {
        left_hand: ["/", "\\", "ノ", "ヽ", "っ", "(ﾟ"],
        eyePairs: [
            ["O", "O"], ["0", "0"], ["o", "o"], ["●", "●"], ["｡", "｡"], ["⊙", "⊙"]
        ],
        mouths: ["O", "o", "0"],
        right_hand: ["", "/", "\\", "ヽ", "ﾉ", "!"]
    },
    greeting: {
        left_hand: ["", "/", "\\", "ノ", "ヽ", "〜", "o/", "ง"],
        eyePairs: [
            ["^", "^"], ["・", "・"], ["•", "•"], ["˘", "˘"], ["⌒", "⌒"], ["✧", "✧"]
        ],
        mouths: ["ᴗ", "‿"],
        right_hand: ["", "/", "\\", "ノ", "ヽ", "〜", "\\o"]
    },
    hugging: {
        left_hand: ["づ", "っ", "つ"],
        eyePairs: [
            ["◕", "◕"], ["•", "•"], ["´", "´"], ["˘", "˘"], ["=", "="], ["≧", "≦"]
        ],
        mouths: ["ᴗ", "‿", "ω"],
        right_hand: ["づ", "っ", "つ"]
    }
};

// Helper function to generate random kaomoji from emotion
const generateKaomoji = (emotion) => {
    const { left_hand, eyePairs, mouths, right_hand } = emotion;
    const randomLeft = left_hand[Math.floor(Math.random() * left_hand.length)];
    const randomEyes = eyePairs[Math.floor(Math.random() * eyePairs.length)];
    const randomMouth = mouths[Math.floor(Math.random() * mouths.length)];
    const randomRight = right_hand[Math.floor(Math.random() * right_hand.length)];

    return `${randomLeft}(${randomEyes[0]}${randomMouth}${randomEyes[1]})${randomRight}`;
};

// Generate 4 random kaomojis for each category for display
const generateKaomojisForCategory = (emotionName) => {
    const emotion = emotions[emotionName];
    return Array(4).fill(null).map(() => generateKaomoji(emotion));
};

const EncodePanel = () => {
    const [secret, setSecret] = useState('');
    const [usePassword, setUsePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [carrierMode, setCarrierMode] = useState('kaomoji');
    const [selectedKaomoji, setSelectedKaomoji] = useState('');
    const [customCarrier, setCustomCarrier] = useState('');
    const [generatedNullMoji, setGeneratedNullMoji] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('joy');
    const [kaomojisForCategory, setKaomojisForCategory] = useState(generateKaomojisForCategory('joy'));
    const selectedChipRef = useRef(null);

    // Auto-scroll selected chip into view
    useEffect(() => {
        if (selectedChipRef.current) {
            selectedChipRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [selectedCategory]);

    const handleGenerate = () => {
        if (!secret) {
            toast.error("Please enter a secret message!");
            return;
        }
        if (usePassword && !password) {
            toast.error("Please enter a password.");
            return;
        }

        // 1. Encrypt
        let payload = secret;
        if (usePassword) {
            payload = encryptMessage(secret, password);
        }

        // 2. Binary & Inject
        const binary = textToBinary(payload);

        let carrier = carrierMode === 'kaomoji' ? selectedKaomoji : customCarrier;
        if (!carrier.trim()) carrier = "( ˘ ³˘)♥";

        const finalOutput = injectInvisible(carrier, binary);
        setGeneratedNullMoji(finalOutput);

        // 3. Copy
        navigator.clipboard.writeText(finalOutput).then(() => {
            toast.success("Copied to clipboard!", {
                description: "Share this NullMoji securely."
            });
        });
    };

    const shareVia = (platform) => {
        if (!generatedNullMoji) {
            toast.error("Generate a NullMoji first!");
            return;
        }

        const text = encodeURIComponent(generatedNullMoji);
        let url = '';

        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${text}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${text}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${text}`;
                break;
            case 'email':
                url = `mailto:?subject=Secret Message&body=${text}`;
                break;
        }

        if (url) window.open(url, '_blank');
    };

    return (
        <div className="w-full p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 animate-fadeIn min-h-[500px] sm:min-h-[600px] overflow-hidden">
            {/* Secret Text Input */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2 text-base">
                    <i className="fas fa-lock text-[#E5C890]"></i>
                    Secret Text
                </Label>
                <Input
                    type="text"
                    placeholder="Type secret message here..."
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    className="text-base"
                />
            </div>

            {/* Password Toggle */}
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                <Checkbox
                    id="enc-pass"
                    checked={usePassword}
                    onCheckedChange={setUsePassword}
                    className="border-2"
                />
                <Label htmlFor="enc-pass" className="flex items-center gap-2 cursor-pointer flex-1 text-base">
                    <i className="fas fa-key text-[#E5C890]"></i>
                    Enable Password Encryption
                </Label>
            </div>

            {usePassword && (
                <div className="space-y-2 animate-fadeIn pl-4 border-l-2 border-primary/30 transition-all duration-300 ease-in-out overflow-hidden">
                    <Input
                        type="password"
                        placeholder="Enter encryption password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-base"
                    />
                </div>
            )}

            <div className="border-t border-border/50 my-6" />

            {/* Sharing Mode */}
            <div className="space-y-4">
                <Label className="flex items-center gap-2 text-base font-semibold">
                    <i className="fas fa-share-nodes text-[#E5C890]"></i>
                    Sharing Mode
                </Label>
                <RadioGroup
                    defaultValue="kaomoji"
                    onValueChange={setCarrierMode}
                    className="flex flex-row gap-4"
                >
                    <div className={`flex items-center space-x-2 p-3 rounded-lg border transition-all flex-1 ${carrierMode === 'kaomoji'
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border/50 hover:border-primary/50'
                        }`}>
                        <RadioGroupItem value="kaomoji" id="r-kaomoji" />
                        <Label htmlFor="r-kaomoji" className="cursor-pointer flex-1">
                            <i className="fas fa-smile mr-2 text-[#E5C890]"></i>Kaomoji
                        </Label>
                    </div>
                    <div className={`flex items-center space-x-2 p-3 rounded-lg border transition-all flex-1 ${carrierMode === 'custom'
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border/50 hover:border-primary/50'
                        }`}>
                        <RadioGroupItem value="custom" id="r-custom" />
                        <Label htmlFor="r-custom" className="cursor-pointer flex-1">
                            <i className="fas fa-edit mr-2 text-[#E5C890]"></i>Custom Text
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {carrierMode === 'kaomoji' && (
                <div className="space-y-4 animate-fadeIn transition-all duration-300 ease-in-out">
                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex gap-2 flex-1 max-w-md overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {Object.keys(emotions).map((category) => (
                                <Button
                                    key={category}
                                    ref={selectedCategory === category ? selectedChipRef : null}
                                    variant="outline"
                                    size="sm"
                                    className={`capitalize transition-all whitespace-nowrap ${selectedCategory === category
                                        ? 'bg-primary/20 border-primary text-white font-semibold'
                                        : 'hover:bg-muted/20 hover:text-slate-50 hover:border-primary/50'
                                        }`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        const newKaomojis = generateKaomojisForCategory(category);
                                        setKaomojisForCategory(newKaomojis);
                                        setSelectedKaomoji(newKaomojis[0]);
                                    }}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                        <div className="flex gap-2 ml-auto">
                            {/* Scroll to Next Emotion Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="shrink-0 hover:bg-primary/20 hover:border-primary transition-all"
                                onClick={() => {
                                    const emotionKeys = Object.keys(emotions);
                                    const currentIndex = emotionKeys.indexOf(selectedCategory);
                                    const nextIndex = (currentIndex + 1) % emotionKeys.length;
                                    const nextCategory = emotionKeys[nextIndex];

                                    setSelectedCategory(nextCategory);
                                    const newKaomojis = generateKaomojisForCategory(nextCategory);
                                    setKaomojisForCategory(newKaomojis);
                                    setSelectedKaomoji(newKaomojis[0]);
                                }}
                                title="Next emotion category"
                            >
                                <i className="fas fa-arrow-right"></i>
                            </Button>
                            {/* Regenerate Button with Arrow Icon */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="shrink-0 hover:bg-primary/20 hover:border-primary transition-all"
                                onClick={() => {
                                    const newKaomojis = generateKaomojisForCategory(selectedCategory);
                                    setKaomojisForCategory(newKaomojis);
                                    setSelectedKaomoji(newKaomojis[0]);
                                    toast.success("New kaomojis generated!");
                                }}
                                title="Generate new kaomojis"
                            >
                                <i className="fas fa-arrow-rotate-right"></i>
                            </Button>
                        </div>
                    </div>

                    {/* Kaomoji Selection */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
                        {kaomojisForCategory.map((k, index) => (
                            <Button
                                key={`${k}-${index}`}
                                variant={selectedKaomoji === k ? "default" : "outline"}
                                className={`h-14 text-xl ${selectedKaomoji === k ? 'ring-2 ring-primary ring-offset-2 ring-offset-background cursor-pointer' : ''}`}
                                onClick={() => setSelectedKaomoji(k)}
                            >
                                {k}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {carrierMode === 'custom' && (
                <div className="animate-fadeIn transition-all duration-300 ease-in-out overflow-hidden">
                    <Input
                        type="text"
                        placeholder="e.g. 'Hey, see you later'"
                        value={customCarrier}
                        onChange={(e) => setCustomCarrier(e.target.value)}
                        className="text-base"
                    />
                </div>
            )}

            <Button className="w-full text-md font-semibold py-6 gap-2 bg-[#E5C890] hover:bg-[#E5C890]/80" onClick={handleGenerate}>
                <i className="fas fa-wand-magic-sparkles"></i>
                Create NullMoji
            </Button>

            {/* Social Sharing Section */}
            {generatedNullMoji && (
                <div className="animate-fadeIn space-y-4 p-4 rounded-lg border border-primary/30 bg-primary/5 transition-all duration-300 ease-in-out overflow-hidden">
                    <Label className="flex items-center gap-2 text-base font-semibold">
                        <i className="fas fa-paper-plane text-[#E5C890]"></i>
                        Share with Friends via
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <Button
                            variant="outline"
                            className="h-20 sm:h-24 flex flex-col gap-1 hover:bg-slate-50 transition-all"
                            onClick={() => shareVia('whatsapp')}
                        >
                            <i className="fab fa-whatsapp text-xl sm:text-2xl"></i>
                            <span className="text-xs">WhatsApp</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 sm:h-24 flex flex-col gap-1 hover:bg-slate-50 transition-all"
                            onClick={() => shareVia('telegram')}
                        >
                            <i className="fab fa-telegram text-xl sm:text-2xl"></i>
                            <span className="text-xs">Telegram</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 sm:h-24 flex flex-col gap-1 hover:bg-slate-50 transition-all"
                            onClick={() => shareVia('twitter')}
                        >
                            <i className="fab fa-twitter text-xl sm:text-2xl"></i>
                            <span className="text-xs">Twitter</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 sm:h-24 flex flex-col gap-1 hover:bg-slate-50 transition-all"
                            onClick={() => shareVia('email')}
                        >
                            <i className="fas fa-envelope text-xl sm:text-2xl"></i>
                            <span className="text-xs">Email</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EncodePanel;
