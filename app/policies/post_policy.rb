class PostPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    record.published? || owner?
  end

  def create?
    user.present?
  end

  def update?
    owner?
  end

  def destroy?
    owner?
  end

  def publish?
    owner?
  end

  def unpublish?
    owner?
  end

  private

  def owner?
    user.present? && user == record.user
  end

  class Scope < Scope
    def resolve
      if user.present?
        scope.all
      else
        scope.published
      end
    end
  end
end
