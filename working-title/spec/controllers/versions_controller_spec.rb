require "rails_helper"

describe VersionsController do
  # let(:project) { Version.create(name: "as;dlkfja;sldkfja")}
  # let(:version) { Version.create(contribution: "testesteststestststsetset", contributor_id: 1, project_id: 1)}
  # let(:version_2) { Version.create(contribution: "testesteststestststsetset", contributor_id: 1, previous_version: version)}

  it { should belong_to(:previous_version) }
  it { should belong_to(:contributor) }
  it { should validate_presence_of(:project) }
end
