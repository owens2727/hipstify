gcloud builds submit --tag gcr.io/hipstify/hipstify:latest --project hipstify
gcloud run deploy hipstify --image gcr.io/hipstify/hipstify:latest --platform managed --project hipstify
