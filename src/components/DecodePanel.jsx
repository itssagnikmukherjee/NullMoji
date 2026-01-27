import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { decryptMessage } from '../utils/crypto';
import { extractHiddenBinary, binaryToText } from '../utils/steganography';
import DecryptedText from './DecryptedText';

const DecodePanel = () => {
    const [input, setInput] = useState('');
    const [usePassword, setUsePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [resultType, setResultType] = useState('success');

    const handleDecode = () => {
        setResult('');
        if (!input) return;

        const binary = extractHiddenBinary(input);

        if (!binary) {
            setResult("No hidden message found.");
            setResultType('error');
            return;
        }

        const extractedData = binaryToText(binary);
        let finalMessage = extractedData;

        if (usePassword) {
            if (!password) {
                setResult("⚠️ Please enter the password.");
                setResultType('error');
                return;
            } else {
                const decrypted = decryptMessage(extractedData, password);
                if (decrypted) {
                    finalMessage = decrypted;
                    setResultType('success');
                } else {
                    setResult("⚠️ Wrong Password or Decryption Failed");
                    setResultType('error');
                    return;
                }
            }
        } else {
            if (extractedData.startsWith("U2F")) {
                setResult("⚠️ This looks encrypted. Enable the password toggle!");
                setResultType('warning');
                return;
            }
            setResultType('success');
        }

        setResult(finalMessage);
    };

    return (
        <div className="w-full p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 animate-fadeIn min-h-[500px] sm:min-h-[600px] overflow-hidden">
            {/* Paste Input */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2 text-base">
                    <i className="fas fa-paste text-[#E5C890]"></i>
                    Paste Suspicious Text
                </Label>
                <Textarea
                    rows={4}
                    placeholder="Paste text here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-base resize-none"
                />
            </div>

            {/* Password Toggle */}
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                <Checkbox
                    id="dec-pass"
                    checked={usePassword}
                    onCheckedChange={setUsePassword}
                    className="border-2"
                />
                <Label htmlFor="dec-pass" className="flex items-center gap-2 cursor-pointer flex-1 text-base">
                    <i className="fas fa-shield-halved text-[#E5C890]"></i>
                    Message is Encrypted?
                </Label>
            </div>

            {usePassword && (
                <div className="space-y-2 animate-fadeIn pl-4 border-l-2 border-primary/30 transition-all duration-300 ease-in-out overflow-hidden">
                    <Input
                        type="password"
                        placeholder="Enter decryption password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-base"
                    />
                </div>
            )}

            <Button className="w-full text-md font-semibold py-6 gap-2 bg-[#E5C890] hover:bg-[#E5C890]/80" onClick={handleDecode}>
                <i className="fas fa-eye"></i>
                Reveal Secret
            </Button>

            {result && (
                <div className={`p-5 rounded-lg border-2 animate-fadeIn text-center break-all font-medium transition-all duration-300 ease-in-out overflow-hidden
                    ${resultType === 'error' ? 'border-red-500/50 text-red-400 bg-red-500/10' : ''}
                    ${resultType === 'warning' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' : ''}
                    ${resultType === 'success' ? 'border-green-500/50 text-green-400 bg-green-500/10' : ''}
                `}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {resultType === 'error' && <i className="fas fa-circle-exclamation text-xl"></i>}
                        {resultType === 'warning' && <i className="fas fa-triangle-exclamation text-xl"></i>}
                        {resultType === 'success' && <i className="fas fa-circle-check text-xl"></i>}
                    </div>
                    {resultType === 'success' ? (
                        <DecryptedText
                            text={result}
                            className="text-green-400"
                            encryptedClassName="text-green-300/40"
                            speed={30}
                            maxIterations={15}
                            animateOn="view"
                            sequential={false}
                        />
                    ) : (
                        result
                    )}
                </div>
            )}
        </div>
    );
};

export default DecodePanel;
