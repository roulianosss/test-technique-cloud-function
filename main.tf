provider "google" {
  credentials = file("./credentials.json")
  project     = "decoded-app-398314"
  region      = "eu-west2"
}

resource "google_cloudfunctions_function" "LastChance" {
  name        = "LastChance"
  description = "My Cloud Function"
  runtime     = "nodejs16"  

  source_archive_bucket = "test-cloud-function-matchem"
  source_archive_object = "./code.zip"

  entry_point = "helloHttp"
  https_trigger = {}
}