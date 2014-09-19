class VotesController < ApplicationController
  def create
    voteable_type = votes_params[:voteable_type]
    voteable_id = votes_params[:voteable_id]
    if Vote.where(user_id: current_user.id, voteable_id: voteable_id, voteable_type: voteable_type).length == 0
      @vote = current_user.votes.create(votes_params)
    end

    if voteable_type == "Project"
      passback = Project.find(voteable_id).calculate_vote_score
    elsif voteable_type == "Version"
      passback = Version.find(voteable_id).calculate_branch_vote_score
    end

    respond_to do |format|
      format.js { render :json => passback }
      format.html { redirect_to root_path }
    end
  end

  private

  def votes_params
    params.require(:vote).permit(:voteable_id, :voteable_type, :positive)
  end
end
