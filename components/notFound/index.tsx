import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { theme } from "@/globals/theme";
import { SvgXml } from "react-native-svg";

const illustration = `
<svg viewBox="0 0 380 340" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="190" cy="210" rx="72" ry="14" fill="#C8DDD9" opacity="0.5"/>
  <ellipse cx="190" cy="200" rx="72" ry="72" fill="#E8F2F0"/>
  <ellipse cx="190" cy="200" rx="60" ry="60" fill="#D4E8E4"/>
  <ellipse cx="190" cy="200" rx="46" ry="46" fill="#F5FAF9"/>
  <line x1="168" y1="190" x2="212" y2="190" stroke="#C8DDD9" stroke-width="2" stroke-linecap="round"/>
  <line x1="174" y1="200" x2="206" y2="200" stroke="#C8DDD9" stroke-width="2" stroke-linecap="round"/>
  <line x1="168" y1="210" x2="212" y2="210" stroke="#C8DDD9" stroke-width="2" stroke-linecap="round"/>
  <rect x="108" y="148" width="4" height="52" rx="2" fill="#518C81"/>
  <rect x="104" y="148" width="2" height="20" rx="1" fill="#518C81"/>
  <rect x="114" y="148" width="2" height="20" rx="1" fill="#518C81"/>
  <path d="M104 148 Q110 160 116 148" fill="#518C81"/>
  <rect x="268" y="148" width="4" height="52" rx="2" fill="#BF895A"/>
  <path d="M272 148 Q278 162 272 175" fill="#BF895A"/>
  <circle cx="234" cy="168" r="22" fill="none" stroke="#518C81" stroke-width="5"/>
  <circle cx="234" cy="168" r="16" fill="#E8F2F0"/>
  <line x1="250" y1="184" x2="264" y2="198" stroke="#518C81" stroke-width="5" stroke-linecap="round"/>
  <text x="234" y="175" text-anchor="middle" font-size="18" font-weight="500" fill="#518C81" font-family="sans-serif">?</text>
  <circle cx="148" cy="155" r="4" fill="#E3A46D" opacity="0.7"/>
  <circle cx="244" cy="138" r="3" fill="#518C81" opacity="0.5"/>
  <circle cx="160" cy="230" r="3" fill="#BF895A" opacity="0.5"/>
  <circle cx="228" cy="240" r="4" fill="#518C81" opacity="0.4"/>
  <circle cx="262" cy="152" r="3" fill="#E3A46D" opacity="0.6"/>
</svg>
`;

type EmptyListProps = {
    title?: string;
    description?: string;
    buttonText?: string;
    onPress?: () => void;
};

export function EmptyList({
    title = "Nenhum resultado encontrado",
    description = "Tente buscar por outro termo.",
    buttonText,
    onPress,
}: EmptyListProps) {
    return (
        <Center className="flex-1 py-16 px-6">
            <VStack space="md" className="items-center">
                <SvgXml xml={illustration} width={320} height={280} />
                <Heading
                    size="md"
                    className="text-center"
                    style={{ color: theme.colors.lightBlack }}
                >
                    {title}
                </Heading>

                <Text
                    className="text-center text-sm"
                    style={{ color: theme.colors.lightGreen, maxWidth: 260 }}
                >
                    {description}
                </Text>

                {buttonText && onPress && (
                    <Button
                        onPress={onPress}
                        className="mt-2 rounded-full px-6"
                        style={{ backgroundColor: theme.colors.lightGreen }}
                    >
                        <ButtonText style={{ color: theme.colors.white }}>
                            {buttonText}
                        </ButtonText>
                    </Button>
                )}
            </VStack>
        </Center>
    );
}