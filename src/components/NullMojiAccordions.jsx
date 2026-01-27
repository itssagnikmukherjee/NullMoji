import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Code, Shield, Shuffle, CheckCircle2 } from "lucide-react";

const whatIsData = [
    {
        value: "steganography",
        title: "Steganography Tool",
        subtitle: "Hide messages in plain sight",
        content:
            "NullMoji is a steganography tool that hides secret messages within seemingly normal emoji text. Your message is invisible to the naked eye but can be decoded by anyone with the key.",
        icon: Shield,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
    {
        value: "zero-width",
        title: "Zero-Width Characters",
        subtitle: "Invisible Unicode magic",
        content:
            "Uses invisible zero-width Unicode characters (like zero-width joiner, non-joiner, and space) to encode your secret message within emoji sequences. These characters are invisible but computers can detect them.",
        icon: Code,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
    {
        value: "secure",
        title: "Secure & Private",
        subtitle: "Client-side encryption",
        content:
            "All encoding and decoding happens directly in your browser. Your messages never leave your device, ensuring complete privacy and security.",
        icon: CheckCircle2,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
];

const howItWorksData = [
    {
        value: "encoding",
        title: "Encoding Process",
        subtitle: "Transform text to emojis",
        content:
            "Your secret message is converted to binary, then encoded using zero-width characters placed between regular emojis. The result looks like normal emoji text but contains hidden data.",
        icon: Shuffle,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
    {
        value: "decoding",
        title: "Decoding Process",
        subtitle: "Extract hidden messages",
        content:
            "The decoder analyzes the emoji text, extracts the zero-width characters, converts them back to binary, and finally reveals your original secret message.",
        icon: Code,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
    {
        value: "sharing",
        title: "Share Anywhere",
        subtitle: "Works on any platform",
        content:
            "Copy your encoded emoji text and share it via social media, messaging apps, emails, or anywhere text is supported. The hidden message travels with the emojis.",
        icon: CheckCircle2,
        textColor: "text-[#E5C890]",
        bgColor: "bg-[#E5C890]/10",
    },
];

export const WhatIsAccordion = () => (
    <div className="flex items-center justify-center w-full">
        <Accordion
            type="multiple"
            className="w-full -space-y-px"
            defaultValue={[whatIsData[0].value]}
        >
            {whatIsData.map((item) => {
                const Icon = item.icon;
                return (
                    <AccordionItem
                        key={item.value}
                        value={item.value}
                        className="border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
                    >
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "p-2.5 rounded-xl",
                                        item.bgColor,
                                        item.textColor
                                    )}
                                >
                                    <Icon size={20} className="size-5" />
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <span>{item.title}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="ps-14">
                            <p className="text-muted-foreground">{item.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    </div>
);

export const HowItWorksAccordion = () => (
    <div className="flex items-center justify-center w-full">
        <Accordion
            type="multiple"
            className="w-full -space-y-px"
            defaultValue={[howItWorksData[0].value]}
        >
            {howItWorksData.map((item) => {
                const Icon = item.icon;
                return (
                    <AccordionItem
                        key={item.value}
                        value={item.value}
                        className="border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b"
                    >
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "p-2.5 rounded-xl",
                                        item.bgColor,
                                        item.textColor
                                    )}
                                >
                                    <Icon size={20} className="size-5" />
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <span>{item.title}</span>
                                    <span className="text-sm text-muted-foreground">
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="ps-14">
                            <p className="text-muted-foreground">{item.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    </div>
);
