import { ActivityIndicator, View } from "react-native";
import { colors } from "../colors";
import {
  EmphasisText,
  InfoText,
  InlineGroup,
  TextLink,
  TextLinkContent,
} from "../styles";

const { brand } = colors;
const ResendTimer = ({
  activeResend,
  resendEmail,
  resendingEmail,
  resendStatus,
  timeLeft,
  targetTime,
}) => {
  // console.log(`====timeLeft: ${timeLeft}`);
  // console.log(`====activeResend: ${activeResend}`);
  return (
    <View>
      <InlineGroup>
        <InfoText>Didn't receive Email? </InfoText>

        {!resendingEmail && (
          <TextLink
            style={{ opacity: !activeResend && 0.5 }}
            disabled={!activeResend}
            onPress={resendEmail}
          >
            <TextLinkContent
              resendStatus={resendStatus}
              style={{ textDecorationLine: "underline" }}
            >
              {resendStatus}
            </TextLinkContent>
          </TextLink>
        )}

        {resendingEmail && (
          <TextLink disabled>
            <TextLinkContent>
              <ActivityIndicator color={brand} />
            </TextLinkContent>
          </TextLink>
        )}

        {!activeResend && (
          <InfoText>
            in
            <EmphasisText> {` ${timeLeft || targetTime} `}</EmphasisText>
            second(s)
          </InfoText>
        )}
      </InlineGroup>
    </View>
  );
};

export default ResendTimer;
