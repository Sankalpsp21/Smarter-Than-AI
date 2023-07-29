/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { GameSession, UserSession } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function GameSessionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    _ttl: "",
    pinCode: "",
    playerCount: "",
    roundNumber: "",
    roundPrompt: "",
    currentRoundExpiration: "",
    UserSessions: [],
    playersResponded: "",
    roundMode: "",
    aiResponse: "",
  };
  const [_ttl, set_ttl] = React.useState(initialValues._ttl);
  const [pinCode, setPinCode] = React.useState(initialValues.pinCode);
  const [playerCount, setPlayerCount] = React.useState(
    initialValues.playerCount
  );
  const [roundNumber, setRoundNumber] = React.useState(
    initialValues.roundNumber
  );
  const [roundPrompt, setRoundPrompt] = React.useState(
    initialValues.roundPrompt
  );
  const [currentRoundExpiration, setCurrentRoundExpiration] = React.useState(
    initialValues.currentRoundExpiration
  );
  const [UserSessions, setUserSessions] = React.useState(
    initialValues.UserSessions
  );
  const [playersResponded, setPlayersResponded] = React.useState(
    initialValues.playersResponded
  );
  const [roundMode, setRoundMode] = React.useState(initialValues.roundMode);
  const [aiResponse, setAiResponse] = React.useState(initialValues.aiResponse);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    set_ttl(initialValues._ttl);
    setPinCode(initialValues.pinCode);
    setPlayerCount(initialValues.playerCount);
    setRoundNumber(initialValues.roundNumber);
    setRoundPrompt(initialValues.roundPrompt);
    setCurrentRoundExpiration(initialValues.currentRoundExpiration);
    setUserSessions(initialValues.UserSessions);
    setCurrentUserSessionsValue(undefined);
    setCurrentUserSessionsDisplayValue("");
    setPlayersResponded(initialValues.playersResponded);
    setRoundMode(initialValues.roundMode);
    setAiResponse(initialValues.aiResponse);
    setErrors({});
  };
  const [currentUserSessionsDisplayValue, setCurrentUserSessionsDisplayValue] =
    React.useState("");
  const [currentUserSessionsValue, setCurrentUserSessionsValue] =
    React.useState(undefined);
  const UserSessionsRef = React.createRef();
  const getIDValue = {
    UserSessions: (r) => JSON.stringify({ id: r?.id }),
  };
  const UserSessionsIdSet = new Set(
    Array.isArray(UserSessions)
      ? UserSessions.map((r) => getIDValue.UserSessions?.(r))
      : getIDValue.UserSessions?.(UserSessions)
  );
  const userSessionRecords = useDataStoreBinding({
    type: "collection",
    model: UserSession,
  }).items;
  const getDisplayValue = {
    UserSessions: (r) => `${r?._ttl ? r?._ttl + " - " : ""}${r?.id}`,
  };
  const validations = {
    _ttl: [],
    pinCode: [{ type: "Required" }],
    playerCount: [{ type: "Required" }],
    roundNumber: [{ type: "Required" }],
    roundPrompt: [{ type: "Required" }],
    currentRoundExpiration: [{ type: "Required" }],
    UserSessions: [],
    playersResponded: [{ type: "Required" }],
    roundMode: [{ type: "Required" }],
    aiResponse: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          _ttl,
          pinCode,
          playerCount,
          roundNumber,
          roundPrompt,
          currentRoundExpiration,
          UserSessions,
          playersResponded,
          roundMode,
          aiResponse,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          const modelFieldsToSave = {
            _ttl: modelFields._ttl,
            pinCode: modelFields.pinCode,
            playerCount: modelFields.playerCount,
            roundNumber: modelFields.roundNumber,
            roundPrompt: modelFields.roundPrompt,
            currentRoundExpiration: modelFields.currentRoundExpiration,
            playersResponded: modelFields.playersResponded,
            roundMode: modelFields.roundMode,
            aiResponse: modelFields.aiResponse,
          };
          const gameSession = await DataStore.save(
            new GameSession(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...UserSessions.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  UserSession.copyOf(original, (updated) => {
                    updated.gameSessionID = gameSession.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameSessionCreateForm")}
      {...rest}
    >
      <TextField
        label="Ttl"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={_ttl}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl: value,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?._ttl ?? value;
          }
          if (errors._ttl?.hasError) {
            runValidationTasks("_ttl", value);
          }
          set_ttl(value);
        }}
        onBlur={() => runValidationTasks("_ttl", _ttl)}
        errorMessage={errors._ttl?.errorMessage}
        hasError={errors._ttl?.hasError}
        {...getOverrideProps(overrides, "_ttl")}
      ></TextField>
      <TextField
        label="Pin code"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={pinCode}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode: value,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.pinCode ?? value;
          }
          if (errors.pinCode?.hasError) {
            runValidationTasks("pinCode", value);
          }
          setPinCode(value);
        }}
        onBlur={() => runValidationTasks("pinCode", pinCode)}
        errorMessage={errors.pinCode?.errorMessage}
        hasError={errors.pinCode?.hasError}
        {...getOverrideProps(overrides, "pinCode")}
      ></TextField>
      <TextField
        label="Player count"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={playerCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount: value,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.playerCount ?? value;
          }
          if (errors.playerCount?.hasError) {
            runValidationTasks("playerCount", value);
          }
          setPlayerCount(value);
        }}
        onBlur={() => runValidationTasks("playerCount", playerCount)}
        errorMessage={errors.playerCount?.errorMessage}
        hasError={errors.playerCount?.hasError}
        {...getOverrideProps(overrides, "playerCount")}
      ></TextField>
      <TextField
        label="Round number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={roundNumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber: value,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.roundNumber ?? value;
          }
          if (errors.roundNumber?.hasError) {
            runValidationTasks("roundNumber", value);
          }
          setRoundNumber(value);
        }}
        onBlur={() => runValidationTasks("roundNumber", roundNumber)}
        errorMessage={errors.roundNumber?.errorMessage}
        hasError={errors.roundNumber?.hasError}
        {...getOverrideProps(overrides, "roundNumber")}
      ></TextField>
      <TextField
        label="Round prompt"
        isRequired={true}
        isReadOnly={false}
        value={roundPrompt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt: value,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.roundPrompt ?? value;
          }
          if (errors.roundPrompt?.hasError) {
            runValidationTasks("roundPrompt", value);
          }
          setRoundPrompt(value);
        }}
        onBlur={() => runValidationTasks("roundPrompt", roundPrompt)}
        errorMessage={errors.roundPrompt?.errorMessage}
        hasError={errors.roundPrompt?.hasError}
        {...getOverrideProps(overrides, "roundPrompt")}
      ></TextField>
      <TextField
        label="Current round expiration"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={
          currentRoundExpiration &&
          convertToLocal(new Date(currentRoundExpiration))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration: value,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.currentRoundExpiration ?? value;
          }
          if (errors.currentRoundExpiration?.hasError) {
            runValidationTasks("currentRoundExpiration", value);
          }
          setCurrentRoundExpiration(value);
        }}
        onBlur={() =>
          runValidationTasks("currentRoundExpiration", currentRoundExpiration)
        }
        errorMessage={errors.currentRoundExpiration?.errorMessage}
        hasError={errors.currentRoundExpiration?.hasError}
        {...getOverrideProps(overrides, "currentRoundExpiration")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions: values,
              playersResponded,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            values = result?.UserSessions ?? values;
          }
          setUserSessions(values);
          setCurrentUserSessionsValue(undefined);
          setCurrentUserSessionsDisplayValue("");
        }}
        currentFieldValue={currentUserSessionsValue}
        label={"User sessions"}
        items={UserSessions}
        hasError={errors?.UserSessions?.hasError}
        errorMessage={errors?.UserSessions?.errorMessage}
        getBadgeText={getDisplayValue.UserSessions}
        setFieldValue={(model) => {
          setCurrentUserSessionsDisplayValue(
            model ? getDisplayValue.UserSessions(model) : ""
          );
          setCurrentUserSessionsValue(model);
        }}
        inputFieldRef={UserSessionsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="User sessions"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search UserSession"
          value={currentUserSessionsDisplayValue}
          options={userSessionRecords
            .filter((r) => !UserSessionsIdSet.has(getIDValue.UserSessions?.(r)))
            .map((r) => ({
              id: getIDValue.UserSessions?.(r),
              label: getDisplayValue.UserSessions?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserSessionsValue(
              userSessionRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentUserSessionsDisplayValue(label);
            runValidationTasks("UserSessions", label);
          }}
          onClear={() => {
            setCurrentUserSessionsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.UserSessions?.hasError) {
              runValidationTasks("UserSessions", value);
            }
            setCurrentUserSessionsDisplayValue(value);
            setCurrentUserSessionsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("UserSessions", currentUserSessionsDisplayValue)
          }
          errorMessage={errors.UserSessions?.errorMessage}
          hasError={errors.UserSessions?.hasError}
          ref={UserSessionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "UserSessions")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Players responded"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={playersResponded}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded: value,
              roundMode,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.playersResponded ?? value;
          }
          if (errors.playersResponded?.hasError) {
            runValidationTasks("playersResponded", value);
          }
          setPlayersResponded(value);
        }}
        onBlur={() => runValidationTasks("playersResponded", playersResponded)}
        errorMessage={errors.playersResponded?.errorMessage}
        hasError={errors.playersResponded?.hasError}
        {...getOverrideProps(overrides, "playersResponded")}
      ></TextField>
      <SelectField
        label="Round mode"
        placeholder="Please select an option"
        isDisabled={false}
        value={roundMode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode: value,
              aiResponse,
            };
            const result = onChange(modelFields);
            value = result?.roundMode ?? value;
          }
          if (errors.roundMode?.hasError) {
            runValidationTasks("roundMode", value);
          }
          setRoundMode(value);
        }}
        onBlur={() => runValidationTasks("roundMode", roundMode)}
        errorMessage={errors.roundMode?.errorMessage}
        hasError={errors.roundMode?.hasError}
        {...getOverrideProps(overrides, "roundMode")}
      >
        <option
          children="Prompt"
          value="PROMPT"
          {...getOverrideProps(overrides, "roundModeoption0")}
        ></option>
        <option
          children="Play"
          value="PLAY"
          {...getOverrideProps(overrides, "roundModeoption1")}
        ></option>
        <option
          children="Vote"
          value="VOTE"
          {...getOverrideProps(overrides, "roundModeoption2")}
        ></option>
        <option
          children="Message"
          value="MESSAGE"
          {...getOverrideProps(overrides, "roundModeoption3")}
        ></option>
        <option
          children="Win"
          value="WIN"
          {...getOverrideProps(overrides, "roundModeoption4")}
        ></option>
        <option
          children="Lose"
          value="LOSE"
          {...getOverrideProps(overrides, "roundModeoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Ai response"
        isRequired={true}
        isReadOnly={false}
        value={aiResponse}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              _ttl,
              pinCode,
              playerCount,
              roundNumber,
              roundPrompt,
              currentRoundExpiration,
              UserSessions,
              playersResponded,
              roundMode,
              aiResponse: value,
            };
            const result = onChange(modelFields);
            value = result?.aiResponse ?? value;
          }
          if (errors.aiResponse?.hasError) {
            runValidationTasks("aiResponse", value);
          }
          setAiResponse(value);
        }}
        onBlur={() => runValidationTasks("aiResponse", aiResponse)}
        errorMessage={errors.aiResponse?.errorMessage}
        hasError={errors.aiResponse?.hasError}
        {...getOverrideProps(overrides, "aiResponse")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
