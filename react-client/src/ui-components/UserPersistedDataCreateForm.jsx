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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { UserPersistedData, UserSession } from "../models";
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
export default function UserPersistedDataCreateForm(props) {
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
    username: "",
    totalScore: "",
    totalGames: "",
    wins: "",
    losses: "",
    rank: "",
    UserSessions: [],
  };
  const [username, setUsername] = React.useState(initialValues.username);
  const [totalScore, setTotalScore] = React.useState(initialValues.totalScore);
  const [totalGames, setTotalGames] = React.useState(initialValues.totalGames);
  const [wins, setWins] = React.useState(initialValues.wins);
  const [losses, setLosses] = React.useState(initialValues.losses);
  const [rank, setRank] = React.useState(initialValues.rank);
  const [UserSessions, setUserSessions] = React.useState(
    initialValues.UserSessions
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUsername(initialValues.username);
    setTotalScore(initialValues.totalScore);
    setTotalGames(initialValues.totalGames);
    setWins(initialValues.wins);
    setLosses(initialValues.losses);
    setRank(initialValues.rank);
    setUserSessions(initialValues.UserSessions);
    setCurrentUserSessionsValue(undefined);
    setCurrentUserSessionsDisplayValue("");
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
    UserSessions: (r) =>
      `${r?.eliminated ? r?.eliminated + " - " : ""}${r?.id}`,
  };
  const validations = {
    username: [{ type: "Required" }],
    totalScore: [{ type: "Required" }],
    totalGames: [{ type: "Required" }],
    wins: [{ type: "Required" }],
    losses: [{ type: "Required" }],
    rank: [{ type: "Required" }],
    UserSessions: [],
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
          username,
          totalScore,
          totalGames,
          wins,
          losses,
          rank,
          UserSessions,
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
            username: modelFields.username,
            totalScore: modelFields.totalScore,
            totalGames: modelFields.totalGames,
            wins: modelFields.wins,
            losses: modelFields.losses,
            rank: modelFields.rank,
          };
          const userPersistedData = await DataStore.save(
            new UserPersistedData(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...UserSessions.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  UserSession.copyOf(original, (updated) => {
                    updated.userPersistedDataID = userPersistedData.id;
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
      {...getOverrideProps(overrides, "UserPersistedDataCreateForm")}
      {...rest}
    >
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              username: value,
              totalScore,
              totalGames,
              wins,
              losses,
              rank,
              UserSessions,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
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
              username,
              totalScore: value,
              totalGames,
              wins,
              losses,
              rank,
              UserSessions,
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
              username,
              totalScore,
              totalGames: value,
              wins,
              losses,
              rank,
              UserSessions,
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
              username,
              totalScore,
              totalGames,
              wins: value,
              losses,
              rank,
              UserSessions,
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
              username,
              totalScore,
              totalGames,
              wins,
              losses: value,
              rank,
              UserSessions,
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
      <TextField
        label="Rank"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={rank}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              username,
              totalScore,
              totalGames,
              wins,
              losses,
              rank: value,
              UserSessions,
            };
            const result = onChange(modelFields);
            value = result?.rank ?? value;
          }
          if (errors.rank?.hasError) {
            runValidationTasks("rank", value);
          }
          setRank(value);
        }}
        onBlur={() => runValidationTasks("rank", rank)}
        errorMessage={errors.rank?.errorMessage}
        hasError={errors.rank?.hasError}
        {...getOverrideProps(overrides, "rank")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              username,
              totalScore,
              totalGames,
              wins,
              losses,
              rank,
              UserSessions: values,
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
