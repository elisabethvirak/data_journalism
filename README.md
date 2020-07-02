# Exoplanet Exploration

![exoplanets.jpg](Images/exoplanets.jpg)

## Background
Over a period of nine years in deep space, the NASA Kepler space telescope has been out on a planet-hunting mission to discover hidden planets outside of our solar system.
For this project, we explored the data collected by Kepler to create a model that will most accurately assess future potential planets and categorize them as CONFIRMED, CANDIDATE, or FALSE POSITIVE.

1. Initially, this data was simply cleaned and cut down to a few initial features. These were later changed.

2. SKLearn's MinMaxScaler was then used to scale the data.

3. A logistic regression model was created to test the features. It was discovered that features such as 'koi_depth', 'koi_impact', and 'koi_duration', as well as others, dropped the testing scores to around 50%. The best score was received with the following features:
>> 'koi_fpflag_nt', 'koi_fpflag_ss', 'koi_fpflag_co', 'koi_fpflag_ec','koi_period','dec','koi_kepmag','koi_slogg','koi_impact'
A training data score of 78.47% and a testing data score of 80.21% was received.

4. After using the logistic regression model, a K Nearest Neighbors model was attempted. Using 15 neighbors, the model received an accuracy score of 79.7%. Being that this was less than the logistic regression model score, we moved on to another model.

5. Next a decision tree was attempted using a max-depth of 8. This received a training score of 81.17% and a testing score of 81.06%.

6. Finally, we used RandomForestClassifier with 45 estimators to test our data The training data score was 99.96%, suggesting the model was overfit to our data. It also received a testing data score of 82.89%.

7. After seeing the highest testing data score with the RandomForestClassifier, we used GridSearchCV to attempt more parameters and diminish the likeliness that the model was overfit to our training data. The number of estimators given as parameters were 100,200,300,400, and 500. The min_samples_leaf options were 1, 2, 3, and 4. The best parameters were found to be 400 estimators and 2 min_samples_leaf. This received a score of 81.27%.

8. A classification report was then used to check the precision and recall for all three categorizations. Here it was discovered that the model is most accurately predicting FALSE POSITIVE, but the precision and recall scores for CANDIDATE and CONFIRMED planets were significantly lower. This is likely because the dataset is imbalanced. It includes twice as many FALSE POSITIVE records as CANDIDATE or CONFIRMED. Due to this finding, we attempted to balance the dataset.

9. In order to balance the dataset, we duplicated the CANDIDATE and CONFIRMED records and appended them to the original dataset. This results in a near equal number of records for FALSE POSITIVE, CANDIDATE, and CONFIRMED cases.

10. Steps 6-8 were completed using the new balanced dataset.
