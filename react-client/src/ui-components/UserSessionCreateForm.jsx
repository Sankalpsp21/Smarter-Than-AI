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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { UserSession, GameSession, UserPersistedData } from "../models";
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
export default function UserSessionCreateForm(props) {
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
    eliminated: false,
    currentRoundResponse: "",
    currentVoteResponse: "",
    totalScore: "",
    totalGames: "",
    wins: "",
    losses: "",
    gameSessionID: undefined,
    userPersistedDataID: undefined,
  };
  const [_ttl, set_ttl] = React.useState(initialValues._ttl);
  const [eliminated, setEliminated] = React.useState(initialValues.eliminated);
  const [currentRoundResponse, setCurrentRoundResponse] = React.useState(
    initialValues.currentRoundResponse
  );
  const [currentVoteResponse, setCurrentVoteResponse] = React.useState(
    initialValues.currentVoteResponse
  );
  const [totalScore, setTotalScore] = React.useState(initialValues.totalScore);
  const [totalGames, setTotalGames] = React.useState(initialValues.totalGames);
  const [wins, setWins] = React.useState(initialValues.wins);
  const [losses, setLosses] = React.useState(initialValues.losses);
  const [gameSessionID, setGameSessionID] = React.useState(
    initialValues.gameSessionID
  );
  const [userPersistedDataID, setUserPersistedDataID] = React.useState(
    initialValues.userPersistedDataID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    set_ttl(initialValues._ttl);
    setEliminated(initialValues.eliminated);
    setCurrentRoundResponse(initialValues.currentRoundResponse);
    setCurrentVoteResponse(initialValues.currentVoteResponse);
    setTotalScore(initialValues.totalScore);
    setTotalGames(initialValues.totalGames);
    setWins(initialValues.wins);
    setLosses(initialValues.losses);
    setGameSessionID(initialValues.gameSessionID);
    setCurrentGameSessionIDValue(undefined);
    setCurrentGameSessionIDDisplayValue("");
    setUserPersistedDataID(initialValues.userPersistedDataID);
    setCurrentUserPersistedDataIDValue(undefined);
    setCurrentUserPersistedDataIDDisplayValue("");
    setErrors({});
  };
  const [
    currentGameSessionIDDisplayValue,
    setCurrentGameSessionIDDisplayValue,
  ] = React.useState("");
  const [currentGameSessionIDValue, setCurrentGameSessionIDValue] =
    React.useState(undefined);
  const gameSessionIDRef = React.createRef();
  const [
    currentUserPersistedDataIDDisplayValue,
    setCurrentUserPersistedDataIDDisplayValue,
  ] = React.useState("");
  const [currentUserPersistedDataIDValue, setCurrentUserPersistedDataIDValue] =
    React.useState(undefined);
  const userPersistedDataIDRef = React.createRef();
  const gameSessionRecords = useDataStoreBinding({
    type: "collection",
    model: GameSession,
  }).items;
  const userPersistedDataRecords = useDataStoreBinding({
    type: "collection",
    model: UserPersistedData,
  }).items;
  const getDisplayValue = {
    gameSessionID: (r) => `${r?._ttl ? r?._ttl + " - " : ""}${r?.id}`,
    userPersistedDataID: (r) => `${r?._ttl ? r?._ttl + " - " : ""}${r?.id}`,
  };
  const validations = {
    _ttl: [],
    eliminated: [{ type: "Required" }],
    currentRoundResponse: [{ type: "Required" }],
    currentVoteResponse: [{ type: "Required" }],
    totalScore: [{ type: "Required" }],
    totalGames: [{ type: "Required" }],
    wins: [{ type: "Required" }],
    losses: [{ type: "Required" }],
    gameSessionID: [{ type: "Required" }],
    userPersistedDataID: [],
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
          eliminated,
          currentRoundResponse,
          currentVoteResponse,
          totalScore,
          totalGames,
          wins,
          losses,
          gameSessionID,
          userPersistedDataID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
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
          await DataStore.save(new UserSession(modelFields));
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
      {...getOverrideProps(overrides, "UserSessionCreateForm")}
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
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
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
      <SwitchField
        label="Eliminated"
        defaultChecked={false}
        isDisabled={false}
        isChecked={eliminated}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated: value,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.eliminated ?? value;
          }
          if (errors.eliminated?.hasError) {
            runValidationTasks("eliminated", value);
          }
          setEliminated(value);
        }}
        onBlur={() => runValidationTasks("eliminated", eliminated)}
        errorMessage={errors.eliminated?.errorMessage}
        hasError={errors.eliminated?.hasError}
        {...getOverrideProps(overrides, "eliminated")}
      ></SwitchField>
      <TextField
        label="Current round response"
        isRequired={true}
        isReadOnly={false}
        value={currentRoundResponse}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse: value,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.currentRoundResponse ?? value;
          }
          if (errors.currentRoundResponse?.hasError) {
            runValidationTasks("currentRoundResponse", value);
          }
          setCurrentRoundResponse(value);
        }}
        onBlur={() =>
          runValidationTasks("currentRoundResponse", currentRoundResponse)
        }
        errorMessage={errors.currentRoundResponse?.errorMessage}
        hasError={errors.currentRoundResponse?.hasError}
        {...getOverrideProps(overrides, "currentRoundResponse")}
      ></TextField>
      <TextField
        label="Current vote response"
        isRequired={true}
        isReadOnly={false}
        value={currentVoteResponse}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse: value,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.currentVoteResponse ?? value;
          }
          if (errors.currentVoteResponse?.hasError) {
            runValidationTasks("currentVoteResponse", value);
          }
          setCurrentVoteResponse(value);
        }}
        onBlur={() =>
          runValidationTasks("currentVoteResponse", currentVoteResponse)
        }
        errorMessage={errors.currentVoteResponse?.errorMessage}
        hasError={errors.currentVoteResponse?.hasError}
        {...getOverrideProps(overrides, "currentVoteResponse")}
      ></TextField>
      <TextField
        label="Total score"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalScore}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore: value,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.totalScore ?? value;
          }
          if (errors.totalScore?.hasError) {
            runValidationTasks("totalScore", value);
          }
          setTotalScore(value);
        }}
        onBlur={() => runValidationTasks("totalScore", totalScore)}
        errorMessage={errors.totalScore?.errorMessage}
        hasError={errors.totalScore?.hasError}
        {...getOverrideProps(overrides, "totalScore")}
      ></TextField>
      <TextField
        label="Total games"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalGames}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames: value,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.totalGames ?? value;
          }
          if (errors.totalGames?.hasError) {
            runValidationTasks("totalGames", value);
          }
          setTotalGames(value);
        }}
        onBlur={() => runValidationTasks("totalGames", totalGames)}
        errorMessage={errors.totalGames?.errorMessage}
        hasError={errors.totalGames?.hasError}
        {...getOverrideProps(overrides, "totalGames")}
      ></TextField>
      <TextField
        label="Wins"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={wins}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins: value,
              losses,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.wins ?? value;
          }
          if (errors.wins?.hasError) {
            runValidationTasks("wins", value);
          }
          setWins(value);
        }}
        onBlur={() => runValidationTasks("wins", wins)}
        errorMessage={errors.wins?.errorMessage}
        hasError={errors.wins?.hasError}
        {...getOverrideProps(overrides, "wins")}
      ></TextField>
      <TextField
        label="Losses"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={losses}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses: value,
              gameSessionID,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.losses ?? value;
          }
          if (errors.losses?.hasError) {
            runValidationTasks("losses", value);
          }
          setLosses(value);
        }}
        onBlur={() => runValidationTasks("losses", losses)}
        errorMessage={errors.losses?.errorMessage}
        hasError={errors.losses?.hasError}
        {...getOverrideProps(overrides, "losses")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID: value,
              userPersistedDataID,
            };
            const result = onChange(modelFields);
            value = result?.gameSessionID ?? value;
          }
          setGameSessionID(value);
          setCurrentGameSessionIDValue(undefined);
        }}
        currentFieldValue={currentGameSessionIDValue}
        label={"Game session id"}
        items={gameSessionID ? [gameSessionID] : []}
        hasError={errors?.gameSessionID?.hasError}
        errorMessage={errors?.gameSessionID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.gameSessionID(
                gameSessionRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentGameSessionIDDisplayValue(
            value
              ? getDisplayValue.gameSessionID(
                  gameSessionRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentGameSessionIDValue(value);
        }}
        inputFieldRef={gameSessionIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Game session id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search GameSession"
          value={currentGameSessionIDDisplayValue}
          options={gameSessionRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.gameSessionID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentGameSessionIDValue(id);
            setCurrentGameSessionIDDisplayValue(label);
            runValidationTasks("gameSessionID", label);
          }}
          onClear={() => {
            setCurrentGameSessionIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.gameSessionID?.hasError) {
              runValidationTasks("gameSessionID", value);
            }
            setCurrentGameSessionIDDisplayValue(value);
            setCurrentGameSessionIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("gameSessionID", currentGameSessionIDValue)
          }
          errorMessage={errors.gameSessionID?.errorMessage}
          hasError={errors.gameSessionID?.hasError}
          ref={gameSessionIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "gameSessionID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              _ttl,
              eliminated,
              currentRoundResponse,
              currentVoteResponse,
              totalScore,
              totalGames,
              wins,
              losses,
              gameSessionID,
              userPersistedDataID: value,
            };
            const result = onChange(modelFields);
            value = result?.userPersistedDataID ?? value;
          }
          setUserPersistedDataID(value);
          setCurrentUserPersistedDataIDValue(undefined);
        }}
        currentFieldValue={currentUserPersistedDataIDValue}
        label={"User persisted data id"}
        items={userPersistedDataID ? [userPersistedDataID] : []}
        hasError={errors?.userPersistedDataID?.hasError}
        errorMessage={errors?.userPersistedDataID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.userPersistedDataID(
                userPersistedDataRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUserPersistedDataIDDisplayValue(
            value
              ? getDisplayValue.userPersistedDataID(
                  userPersistedDataRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentUserPersistedDataIDValue(value);
        }}
        inputFieldRef={userPersistedDataIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="User persisted data id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search UserPersistedData"
          value={currentUserPersistedDataIDDisplayValue}
          options={userPersistedDataRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.userPersistedDataID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentUserPersistedDataIDValue(id);
            setCurrentUserPersistedDataIDDisplayValue(label);
            runValidationTasks("userPersistedDataID", label);
          }}
          onClear={() => {
            setCurrentUserPersistedDataIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.userPersistedDataID?.hasError) {
              runValidationTasks("userPersistedDataID", value);
            }
            setCurrentUserPersistedDataIDDisplayValue(value);
            setCurrentUserPersistedDataIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "userPersistedDataID",
              currentUserPersistedDataIDValue
            )
          }
          errorMessage={errors.userPersistedDataID?.errorMessage}
          hasError={errors.userPersistedDataID?.hasError}
          ref={userPersistedDataIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "userPersistedDataID")}
        ></Autocomplete>
      </ArrayField>
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
