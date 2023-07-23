/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { UserPersistedData } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UserPersistedDataUpdateForm(props) {
  const {
    id: idProp,
    userPersistedData: userPersistedDataModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    totalScore: "",
    totalGames: "",
    wins: "",
    losses: "",
    rank: "",
  };
  const [totalScore, setTotalScore] = React.useState(initialValues.totalScore);
  const [totalGames, setTotalGames] = React.useState(initialValues.totalGames);
  const [wins, setWins] = React.useState(initialValues.wins);
  const [losses, setLosses] = React.useState(initialValues.losses);
  const [rank, setRank] = React.useState(initialValues.rank);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userPersistedDataRecord
      ? { ...initialValues, ...userPersistedDataRecord }
      : initialValues;
    setTotalScore(cleanValues.totalScore);
    setTotalGames(cleanValues.totalGames);
    setWins(cleanValues.wins);
    setLosses(cleanValues.losses);
    setRank(cleanValues.rank);
    setErrors({});
  };
  const [userPersistedDataRecord, setUserPersistedDataRecord] = React.useState(
    userPersistedDataModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(UserPersistedData, idProp)
        : userPersistedDataModelProp;
      setUserPersistedDataRecord(record);
    };
    queryData();
  }, [idProp, userPersistedDataModelProp]);
  React.useEffect(resetStateValues, [userPersistedDataRecord]);
  const validations = {
    totalScore: [{ type: "Required" }],
    totalGames: [{ type: "Required" }],
    wins: [{ type: "Required" }],
    losses: [{ type: "Required" }],
    rank: [{ type: "Required" }],
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
          totalScore,
          totalGames,
          wins,
          losses,
          rank,
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
          await DataStore.save(
            UserPersistedData.copyOf(userPersistedDataRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserPersistedDataUpdateForm")}
      {...rest}
    >
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
              totalScore: value,
              totalGames,
              wins,
              losses,
              rank,
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
              totalScore,
              totalGames: value,
              wins,
              losses,
              rank,
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
              totalScore,
              totalGames,
              wins: value,
              losses,
              rank,
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
              totalScore,
              totalGames,
              wins,
              losses: value,
              rank,
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
              totalScore,
              totalGames,
              wins,
              losses,
              rank: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userPersistedDataModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userPersistedDataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
